package com.project.miniStore.controllers;

import com.project.miniStore.dtos.OrderDetailDTO;
import com.project.miniStore.models.OrderDetail;
import com.project.miniStore.services.OrderDetailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order_details")
@RequiredArgsConstructor
public class OrderDetailController {
    private final OrderDetailService orderDetailService;

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody OrderDetailDTO orderDetailDTO,
                                    BindingResult result) {
        try {
            if(result.hasErrors()) {
                List<String> errMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errMessages);
            }
            OrderDetail orderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
            return ResponseEntity.ok(orderDetail);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetailById(@PathVariable("id") Long id) {
        return ResponseEntity.ok("id" + id);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getAllByOrderId(@PathVariable("orderId") Long orderId) {
        return ResponseEntity.ok("id" + orderId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody OrderDetailDTO orderDetailDTO) {
        try {
            return ResponseEntity.ok("updated " + id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok("deleted " + id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
