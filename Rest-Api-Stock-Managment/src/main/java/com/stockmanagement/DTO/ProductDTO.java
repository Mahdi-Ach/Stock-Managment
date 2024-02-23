package com.stockmanagement.DTO;

import com.stockmanagement.BO.Product;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String productname;
    private String description;
    private String quantite;
    private String price;
    private String costprice;
    private String currency;
    private String stockLevel;
    private byte[] file;
    private String extensionfile;
    private String filename;
}
