package com.stockmanagement.Controller;

import com.stockmanagement.BO.Product;
import com.stockmanagement.DTO.ProductDTO;
import com.stockmanagement.DTO.ProductListResponseDTO;
import com.stockmanagement.Projections.ProjectIdAndNameAndDesc;
import com.stockmanagement.ServiceImplentation.ProductInt;
import com.stockmanagement.Utils.TableToExcel;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {
    private final ProductInt productInt;
    private final TableToExcel tableToExcel;
    @PostMapping(value="/product")
    public ResponseEntity<HashMap<String,String>> CreateProduct(@Valid @ModelAttribute Product product,@RequestParam(value = "file") MultipartFile file) throws IOException {
        productInt.save(product,file);
        HashMap<String,String> msg = new HashMap<>();
        msg.put("msg","your Product is Succefuly Created");
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/list-Product")
    public ProductListResponseDTO GetListProduct(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size,@RequestParam(defaultValue = "desc") String sort,@RequestParam(defaultValue = "id") String column,@RequestParam(defaultValue = "") String text){
        return productInt.listProduct(page,size,sort,column,text);
    }

    @PostMapping("/product/update/{id}")
    public ResponseEntity<HashMap<String,String>> UpdateProduct(@RequestParam(value = "file",required = false) MultipartFile file,@Valid @ModelAttribute Product product, @PathVariable Long id) throws IOException {
        productInt.UpdateProductFields(product,file,id);
        HashMap<String,String> msg = new HashMap<>();
        msg.put("msg","your Product is Succefuly Updated");
        return ResponseEntity.ok(msg);
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) throws IOException {
        ProductDTO productDTO = productInt.getProductById(id);
        return ResponseEntity.ok(productDTO);
    }
    @DeleteMapping("/product/delete")
    public ResponseEntity<HashMap<String,String>> DeleteProductByListId(@RequestParam List<Long> id){
        productInt.DeleteProductbyId(id);
        HashMap<String,String> deleteion_msg = new HashMap<>();
        deleteion_msg.put("msg","Product is Deleted Succefuly");
        return ResponseEntity.ok(deleteion_msg);
    }

    @GetMapping("/product/export/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=product_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Product> listUsers = productInt.getAllProduct();

        TableToExcel excelExporter = new TableToExcel(listUsers);

        excelExporter.export(response);
    }

    @GetMapping("/product/export/csv")
    public ResponseEntity<byte[]> generateCsvFile() {
        List<Product> employees = productInt.getAllProduct();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "employees.csv");

        byte[] csvBytes = tableToExcel.generateCsv(employees).getBytes();

        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }
}
