from pwdlib import PasswordHash

# Argon2id com os parâmetros recomendados do pwdlib.
password_hash = PasswordHash.recommended()


def hash_password(plain: str) -> str:
    return password_hash.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return password_hash.verify(plain, hashed)
