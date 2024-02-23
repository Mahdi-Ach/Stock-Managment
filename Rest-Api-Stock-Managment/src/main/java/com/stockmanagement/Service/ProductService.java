package com.stockmanagement.Service;

import com.stockmanagement.BO.Product;
import com.stockmanagement.DTO.ProductDTO;
import com.stockmanagement.DTO.ProductListResponseDTO;
import com.stockmanagement.Exceptions.Exception.NoDataFound;
import com.stockmanagement.Projections.ProjectIdAndNameAndDesc;
import com.stockmanagement.Repository.ProductRepo;
import com.stockmanagement.ServiceImplentation.ProductInt;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService implements ProductInt {
    private final ProductRepo productRepo;
    @Override
    public Product save(Product product, MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String[] extension = fileName.split("\\.");
        UUID unique = UUID.randomUUID();
        String new_filename = unique+"."+extension[1];
        String filePath = "C:\\Users\\achba\\Desktop\\PaypalPayment\\Rest-Api-Stock-Managment\\src\\main\\resources\\assets\\" + new_filename;
        File dest = new File(filePath);
        file.transferTo(dest);
        product.setFilename(new_filename);
        product.setCreationDate(new Date());
        product.setLastModifiedDate(new Date());
        return productRepo.save(product);
    }
    private ProductListResponseDTO convertToDTO(Product entity) {
        ProductListResponseDTO dto = new ProductListResponseDTO();
        return dto;
    }
    @Override
    public ProductListResponseDTO listProduct(int page, int size,String sort,String column,String text) {
        Pageable paging = null;
        if(sort.equals("asc")){
            paging = PageRequest.of(page, size, Sort.by(column).ascending());
        }else{
            paging = PageRequest.of(page, size, Sort.by(column).descending());
        }
        Page<ProjectIdAndNameAndDesc> products = null;
        if(!text.isEmpty()){
            products = productRepo.findAllByDeletedIsNullAndProductnameContainingOrDescriptionContaining(text,text,paging);
        }else{
            products = productRepo.findAllProjectedByDeletedIsNull(paging);
        }
        ProductListResponseDTO prod = new ProductListResponseDTO();
        prod.setContent(products.getContent());
        prod.setTotalelements(products.getTotalElements());
        prod.setTotalpage(products.getTotalPages());
        prod.setCurrent_page(products.getNumber());
        return prod;
    }
    @Override
    public void UpdateProductFields(Product productupdate,MultipartFile file,Long id) throws IOException {
        Optional<Product> product = productRepo.findById(id);
        Product actualproduct = product.get();
        if(file != null && !file.isEmpty()){
            String filePath = "C:\\Users\\achba\\Desktop\\PaypalPayment\\Rest-Api-Stock-Managment\\src\\main\\resources\\assets\\";
            String oldfilepath = filePath+actualproduct.getFilename();
            File oldfile = new File(oldfilepath);
            if (oldfile.delete()) {
                System.out.println("Deleted the file: " + oldfile.getName());
            } else {
                System.out.println("Failed to delete the file.");
            }
            String fileName = file.getOriginalFilename();
            String extension = fileName.split("\\.")[1];
            String filename = actualproduct.getFilename().split("\\.")[0];
            String uploadfile = filePath + filename+"."+extension;
            System.out.println(uploadfile);
            File dest = new File(uploadfile);
            file.transferTo(dest);
            actualproduct.setFilename(filename+"."+extension);
        }
        actualproduct.setProductname(productupdate.getProductname());
        actualproduct.setDescription(productupdate.getDescription());
        actualproduct.setQuantite(productupdate.getQuantite());
        actualproduct.setPrice(productupdate.getPrice());
        actualproduct.setCostprice(productupdate.getCostprice());
        actualproduct.setCurrency(productupdate.getCurrency());
        actualproduct.setStockLevel(productupdate.getStockLevel());
        actualproduct.setLastModifiedDate(new Date());
    }
    @Override
    public void DeleteProductbyId(List<Long> id){
        List<Product> product = productRepo.findByIdIn(id);
        if(product.isEmpty()){
            throw new NoDataFound("No Row Selected");
        }
        for(Product p:product){
            p.setDeleted(new Date());
        }
    }
    @Override
    public List<Product> getAllProduct(){
        return productRepo.findAll();
    }
    @Override
    public ProductDTO getProductById(Long id) throws IOException {
        Optional<Product> product = productRepo.findById(id);
        Product actual_product = product.get();
        if(product != null){
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(actual_product.getId());
            productDTO.setProductname(actual_product.getProductname());
            productDTO.setDescription(actual_product.getDescription());
            productDTO.setCurrency(actual_product.getCurrency());
            productDTO.setPrice(actual_product.getPrice());
            productDTO.setCostprice(actual_product.getCostprice());
            productDTO.setStockLevel(actual_product.getStockLevel());
            productDTO.setQuantite(actual_product.getQuantite());
            productDTO.setFilename(actual_product.getFilename());
            String ext = actual_product.getFilename().split("\\.")[1];
            String filePath = "C:\\Users\\achba\\Desktop\\PaypalPayment\\Rest-Api-Stock-Managment\\src\\main\\resources\\assets\\"+actual_product.getFilename();
            productDTO.setExtensionfile(ext);
            productDTO.setFile(readFileToByteArray(filePath));
            return productDTO;
        }
        return null;
    }
    private static byte[] readFileToByteArray(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        return Files.readAllBytes(path);
    }
}
