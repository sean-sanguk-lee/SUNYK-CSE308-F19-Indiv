package com.djamware.react.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contacts")

//enum Contact_Type {
//    PERSONAL, WORK, SCHOOL, OTHER
//}

public class Contact
{
    @Id
    String id;
    String name;
    String address;
    String city;
    String phone;
    String email;
    // Part 2
    // @TODO Change type of contactType from String to Enum
    String contactType;
    String profileURL;

    public Contact() {}

    public Contact(String name, String address, String city, String phone, String email, String contactType, String profileURL)
    {
        this.name = name;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.contactType = contactType;
        this.profileURL = profileURL;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public String getPhone()
    {
        return phone;
    }

    public void setPhone(String phone)
    {
        this.phone = phone;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getContactType()
    {
        return contactType;
    }

    public void setContactType(String contactType)
    {
        this.contactType = contactType;
    }

    public String getProfileURL()
    {
        return profileURL;
    }

    public void setProfileURL(String profileURL)
    {
        this.profileURL = profileURL;
    }
}