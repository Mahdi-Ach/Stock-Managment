package com.stockmanagement.DTO;

import com.stockmanagement.BO.Product;
import com.stockmanagement.Projections.ProjectIdAndNameAndDesc;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductListResponseDTO {
    List<ProjectIdAndNameAndDesc> content;
    int totalpage;
    long totalelements;
    int current_page;
}