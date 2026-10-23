"""CPF e CNPJ: normalização e dígitos verificadores."""

import re

_NON_DIGITS = re.compile(r"\D")


def only_digits(value: str) -> str:
    return _NON_DIGITS.sub("", value)


def _cpf_digit(digits: str) -> str:
    weight = len(digits) + 1
    total = sum(int(d) * (weight - i) for i, d in enumerate(digits))
    rest = total * 10 % 11
    return "0" if rest == 10 else str(rest)


def _cnpj_digit(digits: str) -> str:
    weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2][-len(digits) :]
    rest = sum(int(d) * w for d, w in zip(digits, weights, strict=True)) % 11
    return "0" if rest < 2 else str(11 - rest)


def cpf_with_check_digits(base9: str) -> str:
    first = _cpf_digit(base9)
    return base9 + first + _cpf_digit(base9 + first)


def cnpj_with_check_digits(base12: str) -> str:
    first = _cnpj_digit(base12)
    return base12 + first + _cnpj_digit(base12 + first)


def is_valid_cpf(value: str) -> bool:
    d = only_digits(value)
    if len(d) != 11 or d == d[0] * 11:
        return False
    return cpf_with_check_digits(d[:9]) == d


def is_valid_cnpj(value: str) -> bool:
    d = only_digits(value)
    if len(d) != 14 or d == d[0] * 14:
        return False
    return cnpj_with_check_digits(d[:12]) == d
