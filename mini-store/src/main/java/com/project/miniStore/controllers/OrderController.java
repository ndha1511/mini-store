package com.project.miniStore.controllers;

import com.project.miniStore.dtos.OrderDTO;
import com.project.miniStore.models.Order;
import com.project.miniStore.responses.OrderResponse;
import com.project.miniStore.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody OrderDTO orderDTO,
                                    BindingResult result) throws Exception {
        if(result.hasErrors()) {
            List<String> errMessages = result.getFieldErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errMessages);
        }
        Order order = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable("userId") Long userId) {
        try {
            return ResponseEntity.ok("get orders by user " + userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody OrderDTO orderDTO) {
        try {
            orderService.updateOrder(id, orderDTO);
            return ResponseEntity.ok("updated " + id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            // change field active = false
            orderService.deleteOrder(id);
            return ResponseEntity.ok("deleted " + id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findByStatus/{status}")
    public ResponseEntity<?> findOrderByStatus(@PathVariable String status) {
        try {
            return ResponseEntity.ok(orderService.findOrderByStatus(status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> findAllOrder(@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> limit) {
        try {
            int pageNumber = page.orElse(0);
            int limitPage = limit.orElse(15);
            PageRequest pageRequest = PageRequest.of(pageNumber, limitPage,
                    Sort.by("orderDate").descending());
            Page<Order> orderPage = orderService.findAllOrders(pageRequest);
            OrderResponse orderResponse = OrderResponse.builder()
                    .orders(orderPage.getContent())
                    .totalPage(orderPage.getTotalPages())
                    .build();
            return ResponseEntity.ok(orderResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
