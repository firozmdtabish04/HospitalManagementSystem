package com.Hospital.Management.System.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMIN,
    DOCTOR,
    PATIENT,
    NURSE,
    HOSPITALACCOUNTS,
    MAINTANANCESTAFF,
    AMBULANCE,
    PHARMACY;

    // Optional: Make JSON deserialization case-insensitive
    @JsonCreator
    public static Role fromString(String key) {
        return key == null ? null : Role.valueOf(key.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}
