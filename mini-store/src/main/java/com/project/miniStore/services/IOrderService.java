package com.project.miniStore.services;

import com.project.miniStore.dtos.OrderDTO;
import com.project.miniStore.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;
    Order findById(Long id) throws Exception;
    Order updateOrder(Long id, OrderDTO orderDTO) throws Exception;
    List<Order> findAllByUserId(Long userId) throws Exception;
    void deleteOrder(Long id) throws Exception;
    Page<Order> findAllOrders(PageRequest pageRequest) throws Exception;
    List<Order> findOrderByStatus(String status) throws Exception;
}
