package com.stockmanagement.Utils;

import com.stockmanagement.BO.Product;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;


@Component
public class TableToExcel {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<Product> products;

    public TableToExcel(List<Product> products) {
        this.products = products;
        workbook = new XSSFWorkbook();
    }

    private static final String CSV_HEADER = "ID,Name,Age,Designation,Salary\n";

    public String generateCsv(List<Product> products) {
        StringBuilder csvContent = new StringBuilder();
        csvContent.append(CSV_HEADER);

        for (Product employee : products) {
            csvContent.append(employee.getId()).append(",")
                    .append(employee.getProductname()).append(",")
                    .append(employee.getDescription()).append(",")
                    .append(employee.getFilename()).append(",")
                    .append(employee.getCostprice()).append("\n");
        }

        return csvContent.toString();
    }
    private void writeHeaderLine() {
        sheet = workbook.createSheet("Users");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "id", style);
        createCell(row, 1, "product name", style);
        createCell(row, 2, "Description", style);
        createCell(row, 3, "quantite", style);
        createCell(row, 4, "price", style);
        createCell(row, 4, "costprice", style);
        createCell(row, 4, "currency", style);
        createCell(row, 4, "stockLevel", style);
        createCell(row, 4, "filename", style);
        createCell(row, 4, "creationDate", style);
        createCell(row, 4, "lastModifiedDate", style);
        createCell(row, 4, "deleted", style);
    }
    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        }else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }
    private void writeDataLines() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (Product user : products) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++, user.getId(), style);
            createCell(row, columnCount++, user.getProductname(), style);
            createCell(row, columnCount++, user.getDescription(), style);
            createCell(row, columnCount++, user.getQuantite(), style);
            createCell(row, columnCount++, user.getPrice(), style);
            createCell(row, columnCount++, user.getCostprice(), style);
            createCell(row, columnCount++, user.getCurrency(), style);
            createCell(row, columnCount++, user.getStockLevel(), style);
            createCell(row, columnCount++, user.getFilename(), style);
            createCell(row, columnCount++, user.getCreationDate(), style);
            createCell(row, columnCount++, user.getLastModifiedDate(), style);
            createCell(row, columnCount++, user.getDeleted(), style);

        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}
