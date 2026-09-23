<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');
ini_set('display_errors', '0');
error_reporting(E_ALL);

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function readText(array $payload, string $key): ?string
{
    if (!array_key_exists($key, $payload)) {
        return '';
    }

    if (!is_string($payload[$key]) && !is_numeric($payload[$key])) {
        return null;
    }

    return trim((string) $payload[$key]);
}

function hasHeaderBreak(string $value): bool
{
    return preg_match('/[\r\n]/', $value) === 1;
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody === false ? '' : $rawBody, true);

if (!is_array($payload) || json_last_error() !== JSON_ERROR_NONE) {
    respond(422, ['success' => false, 'message' => 'Please check the submitted form fields.']);
}

$honeypot = $payload['website'] ?? '';
if (is_array($honeypot) || is_object($honeypot) || trim((string) $honeypot) !== '') {
    respond(200, ['success' => true, 'message' => 'Your inquiry has been received.']);
}

$fullName = readText($payload, 'fullName');
$email = readText($payload, 'email');
$phone = readText($payload, 'phone');
$service = readText($payload, 'service');
$message = readText($payload, 'message');

$isValid =
    $fullName !== null && textLength($fullName) >= 2 && textLength($fullName) <= 100 &&
    $email !== null && textLength($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false &&
    $phone !== null && textLength($phone) <= 40 &&
    $service !== null && textLength($service) <= 100 &&
    $message !== null && textLength($message) >= 10 && textLength($message) <= 5000;

if (
    !$isValid ||
    hasHeaderBreak($fullName ?? '') ||
    hasHeaderBreak($email ?? '') ||
    hasHeaderBreak($phone ?? '') ||
    hasHeaderBreak($service ?? '')
) {
    respond(422, ['success' => false, 'message' => 'Please check the submitted form fields.']);
}

$autoloadPath = __DIR__ . '/vendor/autoload.php';
$configPath = dirname(__DIR__) . '/smtp-config.php';

if (!is_readable($autoloadPath) || !is_readable($configPath)) {
    error_log('Contact mail configuration or PHPMailer autoloader is unavailable.');
    respond(500, ['success' => false, 'message' => 'Unable to send your inquiry right now. Please try again later.']);
}

try {
    require $autoloadPath;
    $config = require $configPath;
} catch (Throwable $exception) {
    error_log('Contact mail bootstrap failed: ' . $exception->getMessage());
    respond(500, ['success' => false, 'message' => 'Unable to send your inquiry right now. Please try again later.']);
}

$requiredConfig = ['host', 'username', 'password', 'from_email', 'from_name'];
if (!is_array($config)) {
    error_log('Contact mail configuration is invalid.');
    respond(500, ['success' => false, 'message' => 'Unable to send your inquiry right now. Please try again later.']);
}

foreach ($requiredConfig as $configKey) {
    if (!isset($config[$configKey]) || !is_string($config[$configKey]) || trim($config[$configKey]) === '') {
        error_log('Contact mail configuration is missing a required value.');
        respond(500, ['success' => false, 'message' => 'Unable to send your inquiry right now. Please try again later.']);
    }
}

$serviceLabel = $service !== '' ? $service : 'Not specified';
$phoneLabel = $phone !== '' ? $phone : 'Not provided';
$submittedAt = (new DateTimeImmutable('now', new DateTimeZone('Asia/Colombo')))
    ->format('Y-m-d H:i:s T');

$safeFullName = escapeHtml($fullName);
$safeEmail = escapeHtml($email);
$safePhone = escapeHtml($phoneLabel);
$safeService = escapeHtml($serviceLabel);
$safeMessage = nl2br(escapeHtml($message));
$safeSubmittedAt = escapeHtml($submittedAt);

$htmlBody = <<<HTML
<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Sumathi Printers Website Inquiry</title></head>
<body style="margin:0;padding:24px;background:#f5f7fb;color:#111827;font-family:Arial,sans-serif;">
  <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
    <div style="padding:24px 28px;background:#111827;color:#ffffff;">
      <h1 style="margin:0;font-size:24px;line-height:1.3;">New Sumathi Printers Website Inquiry</h1>
    </div>
    <div style="padding:28px;">
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">
        <tr><td style="width:170px;padding:9px 12px;border-bottom:1px solid #eef0f4;font-weight:bold;">Full Name</td><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;">{$safeFullName}</td></tr>
        <tr><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;font-weight:bold;">Email</td><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;">{$safeEmail}</td></tr>
        <tr><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;font-weight:bold;">Phone</td><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;">{$safePhone}</td></tr>
        <tr><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;font-weight:bold;">Service Required</td><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;">{$safeService}</td></tr>
        <tr><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;font-weight:bold;vertical-align:top;">Project Details / Message</td><td style="padding:9px 12px;border-bottom:1px solid #eef0f4;">{$safeMessage}</td></tr>
        <tr><td style="padding:9px 12px;font-weight:bold;">Submitted At</td><td style="padding:9px 12px;">{$safeSubmittedAt}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>
HTML;

$plainBody = implode("\n", [
    'New Sumathi Printers Website Inquiry',
    '',
    'Full Name: ' . $fullName,
    'Email: ' . $email,
    'Phone: ' . $phoneLabel,
    'Service Required: ' . $serviceLabel,
    'Project Details / Message:',
    $message,
    '',
    'Submitted At: ' . $submittedAt,
]);

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['username']);
    $mail->addReplyTo($email, $fullName);
    $mail->isHTML(true);
    $mail->Subject = 'New Sumathi Printers Website Inquiry - ' . $serviceLabel;
    $mail->Body = $htmlBody;
    $mail->AltBody = $plainBody;
    $mail->send();

    respond(200, ['success' => true, 'message' => 'Your inquiry has been sent successfully.']);
} catch (Throwable $exception) {
    error_log('Contact mail delivery failed: ' . $exception->getMessage());
    respond(500, ['success' => false, 'message' => 'Unable to send your inquiry right now. Please try again later.']);
}
