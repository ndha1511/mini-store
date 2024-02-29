package com.project.miniStore.controllers;

import com.project.miniStore.dtos.CategoryDTO;
import com.project.miniStore.services.ICategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final ICategoryService iCategoryService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(iCategoryService.getAllCategories());
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody CategoryDTO categoryDTO,
                                    BindingResult result) {
        try {
            if(result.hasErrors()) {
                List<String> errMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errMessages);
            }
            iCategoryService.createCategory(categoryDTO);
            return ResponseEntity.ok("insert category successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody CategoryDTO categoryDTO) {
        iCategoryService.updateCategory(id, categoryDTO);
        return ResponseEntity.ok(categoryDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        iCategoryService.deleteCategory(id);
        return ResponseEntity.ok("deleted");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(iCategoryService.getCategoryById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
