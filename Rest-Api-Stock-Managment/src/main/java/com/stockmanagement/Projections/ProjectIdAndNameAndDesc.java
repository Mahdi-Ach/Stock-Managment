package com.stockmanagement.Projections;

import java.util.Date;

public interface ProjectIdAndNameAndDesc {
    Long getId();
    String getDescription();
    String getProductname();
    Date getDeleted();
}