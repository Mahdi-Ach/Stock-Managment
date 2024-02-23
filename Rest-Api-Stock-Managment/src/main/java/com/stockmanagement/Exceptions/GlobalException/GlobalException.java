package com.stockmanagement.Exceptions.GlobalException;

import com.stockmanagement.Exceptions.Exception.NoDataFound;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = new HashMap<>();
        System.out.println(ex.getBindingResult().getFieldErrors());
        ex.getBindingResult().getFieldErrors().forEach(error ->{
            System.out.println(error.getDefaultMessage());
            if(!errors.containsKey(error.getField())){
                List<String> messages = new ArrayList<>();
                messages.add(error.getDefaultMessage());
                errors.put(error.getField(),messages);
            }else{
                errors.get(error.getField()).add(error.getDefaultMessage());
            }
                }
        );
        return ResponseEntity.badRequest().body(errors);
    }
        @ExceptionHandler({NoDataFound.class})
    public ResponseEntity<HashMap<String,String>> NoDataFound(NoDataFound ex){
        HashMap<String,String> msg = new HashMap<>();
        msg.put("nodata",ex.getMessage());
        return ResponseEntity.badRequest().body(msg);
    }
}
