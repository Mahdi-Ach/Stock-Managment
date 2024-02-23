package com.stockmanagement.BO;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Entity
@Table(schema = "PRODUCTS")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Product Name is required")
    private String productname;
    @NotBlank(message = "Field cannot be empty")
    private String description;
    @Pattern(regexp = "^[0-9]*$", message = "Only numeric positive numbers are allowed")
    @NotBlank(message = "quantite is required")
    private String quantite;
    @Pattern(regexp = "^\\d*$", message = "Only numeric numbers are allowed")
    @NotBlank(message = "Price is required")
    private String price;
    @Pattern(regexp = "^\\d*$", message = "Only numeric numbers are allowed")
    @NotBlank(message = "Cost Price is required")
    private String costprice;
    @NotBlank(message = "Currency is required")
    private String currency;
    @Pattern(regexp = "^\\d*$", message = "Only numeric numbers are allowed")
    @NotBlank(message = "Stock level is required")
    private String stockLevel;
    @NotBlank(message = "filename is required")
    private String filename;
    private Date creationDate;
    private Date lastModifiedDate;
    private Date deleted;
}
