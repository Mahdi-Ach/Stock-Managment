package com.stockmanagement.Repository;

import com.stockmanagement.BO.Product;
import com.stockmanagement.Projections.ProjectIdAndNameAndDesc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    Optional<Product> findById(Long id);
    List<Product> findByIdIn(List<Long> id);
    Page<ProjectIdAndNameAndDesc> findAllProjectedByDeletedIsNull(Pageable pageable);
    Page<ProjectIdAndNameAndDesc> findAllByDeletedIsNullAndProductnameContainingOrDescriptionContaining(String text1,String text2,Pageable pageable);
}
