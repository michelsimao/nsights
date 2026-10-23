"""Schemas de entrada e saída da API (Pydantic)."""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class UserOut(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "examples": [
                {
                    "id": 1,
                    "name": "Marina Costa",
                    "email": "admin@nsights.demo",
                    "role": "admin",
                    "is_active": True,
                    "created_at": "2026-01-05T12:00:00Z",
                }
            ]
        },
    )

    id: int
    name: str
    email: str
    role: Literal["analyst", "admin"] = Field(description="`admin` aprova, reprova e reatribui.")
    is_active: bool
    created_at: datetime


class TokenOut(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "token_type": "bearer",
                    "expires_in": 28800,
                    "user": UserOut.model_config["json_schema_extra"]["examples"][0],
                }
            ]
        }
    )

    access_token: str = Field(description="JWT; enviar como `Authorization: Bearer <token>`.")
    token_type: Literal["bearer"] = "bearer"
    expires_in: int = Field(description="Validade do token, em segundos.")
    user: UserOut
