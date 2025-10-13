package com.Hospital.Management.System.dto;

import com.Hospital.Management.System.entity.Role;

public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private Role role;

    public UserDTO() {}

    public UserDTO(Long id, String name, String email, String phone, String gender, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
