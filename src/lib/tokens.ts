/**
 * Génère et vérifie un token signé HMAC-SHA256 pour l'accès non-authentifié aux fiches PDF.
 * Le token est lié à l'ID de l'inscription — il ne peut pas être forgé sans NEXTAUTH_SECRET.
 */

async function getHmacKey(): Promise<CryptoKey> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('NEXTAUTH_SECRET non défini');
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/** Signe l'ID de l'inscription et retourne un token base64url */
export async function signPdfToken(inscriptionId: string): Promise<string> {
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(inscriptionId)
  );
  return Buffer.from(signature).toString('base64url');
}

/** Retourne true si le token est valide pour cet ID */
export async function verifyPdfToken(inscriptionId: string, token: string): Promise<boolean> {
  try {
    const expected = await signPdfToken(inscriptionId);
    // Comparaison en temps constant pour éviter les timing attacks
    if (expected.length !== token.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}
