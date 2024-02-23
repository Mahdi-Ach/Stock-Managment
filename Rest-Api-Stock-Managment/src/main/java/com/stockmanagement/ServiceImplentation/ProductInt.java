package com.stockmanagement.ServiceImplentation;

import com.stockmanagement.BO.Product;
import com.stockmanagement.DTO.ProductDTO;
import com.stockmanagement.DTO.ProductListResponseDTO;
import com.stockmanagement.Projections.ProjectIdAndNameAndDesc;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductInt {
    Product save(Product product, MultipartFile file) throws IOException;
    ProductListResponseDTO listProduct(int page, int size,String sort,String column,String text);
    void DeleteProductbyId(List<Long> id);
    void UpdateProductFields(Product productupdate,MultipartFile file,Long id) throws IOException;
    List<Product> getAllProduct();
    ProductDTO getProductById(Long id) throws IOException;
}
