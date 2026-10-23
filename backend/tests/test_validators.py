import pytest

from app.validators import is_valid_cnpj, is_valid_cpf


@pytest.mark.parametrize("value", ["529.982.247-25", "52998224725"])
def test_cpf_valid(value):
    assert is_valid_cpf(value)


@pytest.mark.parametrize("value", ["529.982.247-24", "11111111111", "1234567890", ""])
def test_cpf_invalid(value):
    assert not is_valid_cpf(value)


@pytest.mark.parametrize("value", ["11.222.333/0001-81", "11222333000181"])
def test_cnpj_valid(value):
    assert is_valid_cnpj(value)


@pytest.mark.parametrize("value", ["11.222.333/0001-80", "00000000000000", "1122233300018"])
def test_cnpj_invalid(value):
    assert not is_valid_cnpj(value)
