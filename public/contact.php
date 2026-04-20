<?php
/**
 * vCard 3.0 download endpoint (HiHello-style compatibility, CRLF, PHOTO folding).
 * Usage: contact.php?id=1
 */

declare(strict_types=1);

header('X-Content-Type-Options: nosniff');

$idRaw = $_GET['id'] ?? '';
$id = filter_var($idRaw, FILTER_VALIDATE_INT);
if ($id === false || $id < 1) {
    header('Content-Type: text/plain; charset=utf-8', true, 400);
    echo 'Invalid id';
    exit;
}

$dataPath = __DIR__ . DIRECTORY_SEPARATOR . 'data.json';
if (!is_readable($dataPath)) {
    header('Content-Type: text/plain; charset=utf-8', true, 500);
    echo 'Contact data unavailable';
    exit;
}

$json = file_get_contents($dataPath);
if ($json === false) {
    header('Content-Type: text/plain; charset=utf-8', true, 500);
    echo 'Contact data unavailable';
    exit;
}

/** @var array<int, array<string, mixed>>|null $contacts */
$contacts = json_decode($json, true);
if (!is_array($contacts)) {
    header('Content-Type: text/plain; charset=utf-8', true, 500);
    echo 'Invalid contact data';
    exit;
}

$contact = null;
foreach ($contacts as $row) {
    if (!is_array($row)) {
        continue;
    }
    $rowId = isset($row['id']) ? filter_var($row['id'], FILTER_VALIDATE_INT) : false;
    if ($rowId !== false && $rowId === $id) {
        $contact = $row;
        break;
    }
}

if ($contact === null) {
    header('Content-Type: text/plain; charset=utf-8', true, 404);
    echo 'Contact not found';
    exit;
}

$name = isset($contact['name']) && is_string($contact['name']) ? trim($contact['name']) : '';
$phone = isset($contact['phone']) && is_string($contact['phone']) ? trim($contact['phone']) : '';
$email = isset($contact['email']) && is_string($contact['email']) ? trim($contact['email']) : '';
$company = isset($contact['company']) && is_string($contact['company']) ? trim($contact['company']) : '';
$title = isset($contact['title']) && is_string($contact['title']) ? trim($contact['title']) : '';
$imageRel = isset($contact['image']) && is_string($contact['image']) ? trim($contact['image']) : '';
$phoneWork = isset($contact['phone_work']) && is_string($contact['phone_work']) ? trim($contact['phone_work']) : '';
$linkedin = isset($contact['linkedin']) && is_string($contact['linkedin']) ? trim($contact['linkedin']) : '';
$website = isset($contact['website']) && is_string($contact['website']) ? trim($contact['website']) : '';

if ($name === '') {
    header('Content-Type: text/plain; charset=utf-8', true, 422);
    echo 'Contact has no name';
    exit;
}

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = isset($_SERVER['HTTP_HOST']) ? (string) $_SERVER['HTTP_HOST'] : 'localhost';
$baseUrl = $scheme . '://' . $host;
$scriptPath = isset($_SERVER['SCRIPT_NAME']) ? (string) $_SERVER['SCRIPT_NAME'] : '/contact.php';
$queryUrl = $baseUrl . $scriptPath . '?id=' . $id;

$imageWebPath = '';
if ($imageRel !== '') {
    $imageWebPath = '/' . ltrim(str_replace('\\', '/', $imageRel), '/');
}
$imageAbsoluteUrl = $imageWebPath !== '' ? ($baseUrl . $imageWebPath) : '';

/**
 * Escape vCard 3.0 text (FN, N, ORG, TITLE, NOTE, etc.).
 */
function vcard_escape(string $value): string
{
    $value = str_replace(["\r\n", "\r", "\n"], '\n', $value);
    return str_replace(['\\', ';', ','], ['\\\\', '\;', '\,'], $value);
}

/** Strip spaces and punctuation for TEL values (Android-friendly). */
function vcard_tel_digits(string $value): string
{
    $digits = preg_replace('/[^\d+]/', '', $value);
    return is_string($digits) && $digits !== '' ? $digits : $value;
}

/**
 * Resize and re-encode as JPEG for small vCard PHOTO payloads (GD).
 *
 * @return string|false JPEG binary, or false on failure / unsupported type
 */
function compressImage(string $sourcePath, int $quality = 60, int $maxWidth = 300): string|false
{
    $info = @getimagesize($sourcePath);
    if ($info === false) {
        return false;
    }

    $mime = $info['mime'] ?? '';

    if ($mime === 'image/jpeg') {
        $image = @imagecreatefromjpeg($sourcePath);
    } elseif ($mime === 'image/png') {
        $image = @imagecreatefrompng($sourcePath);
    } else {
        return false;
    }

    if ($image === false) {
        return false;
    }

    $width = imagesx($image);
    $height = imagesy($image);

    if ($width > $maxWidth) {
        $newWidth = $maxWidth;
        $newHeight = (int) floor($height * ($maxWidth / $width));

        $tmp = imagecreatetruecolor($newWidth, $newHeight);
        if ($tmp === false) {
            imagedestroy($image);
            return false;
        }

        imagecopyresampled($tmp, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);
        $image = $tmp;
    }

    ob_start();
    imagejpeg($image, null, $quality);
    $compressed = ob_get_clean();

    imagedestroy($image);

    if ($compressed === false || $compressed === '') {
        return false;
    }

    return $compressed;
}

$fn = vcard_escape($name);
$n = vcard_escape($name) . ';;;;';
$org = vcard_escape($company);
$jobTitle = vcard_escape($title);
$mail = vcard_escape($email);
$cell = vcard_escape(vcard_tel_digits($phone));
$workTel = $phoneWork !== '' ? vcard_escape(vcard_tel_digits($phoneWork)) : '';
$note = vcard_escape('Generated by your app');
$uidValue = 'vcard-' . uniqid('', true) . '-' . $id;

$lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:' . $fn,
    'N:' . $n,
    'UID:' . $uidValue,
    'EMAIL:' . $mail,
    'TEL;TYPE=CELL:' . $cell,
];

if ($workTel !== '') {
    $lines[] = 'TEL;TYPE=WORK:' . $workTel;
}

$lines[] = 'ORG:' . $org;
$lines[] = 'TITLE:' . $jobTitle;
$vcardUrl = $website !== '' ? $website : $queryUrl;
$lines[] = 'URL:' . $vcardUrl;
if ($linkedin !== '') {
    $lines[] = 'X-SOCIALPROFILE;TYPE=linkedin:' . $linkedin;
}
$lines[] = 'NOTE:' . $note;

$photoEmbedded = false;
$maxEmbedBytes = 50 * 1024;

if ($imageRel !== '' && strpos($imageRel, '..') === false) {
    $imageFs = __DIR__ . DIRECTORY_SEPARATOR . str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $imageRel);
    $realBase = realpath(__DIR__);
    $realImage = is_file($imageFs) ? realpath($imageFs) : false;
    if ($realBase !== false && $realImage !== false && str_starts_with($realImage, $realBase)) {
        $raw = compressImage($realImage, 60, 300);
        if ($raw !== false && strlen($raw) <= $maxEmbedBytes) {
            $b64 = base64_encode($raw);
            $foldedBody = chunk_split($b64, 76, "\r\n ");
            $foldedBody = rtrim($foldedBody, "\r\n ");
            $lines[] = 'PHOTO;ENCODING=B;TYPE=JPEG:' . "\r\n " . $foldedBody;
            $photoEmbedded = true;
        }
    }
}

if (!$photoEmbedded && $imageAbsoluteUrl !== '') {
    $lines[] = 'PHOTO;TYPE=JPEG;VALUE=uri:' . $imageAbsoluteUrl;
}

$lines[] = 'END:VCARD';

$vcf = implode("\r\n", $lines);

$filename = 'contact-' . $id . '.vcf';
header('Content-Type: text/vcard; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . (string) strlen($vcf));

echo $vcf;
exit;
