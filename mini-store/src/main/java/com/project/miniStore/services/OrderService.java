package com.project.miniStore.services;

import com.project.miniStore.dtos.OrderDTO;
import com.project.miniStore.exceptions.DataNotFoundException;
import com.project.miniStore.models.Order;
import com.project.miniStore.models.OrderStatus;
import com.project.miniStore.models.User;
import com.project.miniStore.repositories.OrderRepository;
import com.project.miniStore.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    @Override
    public Order createOrder(OrderDTO orderDTO) throws Exception {
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("user id not found"));
        Order order = Order.builder()
                .email(orderDTO.getEmail())
                .orderDate(LocalDateTime.now())
                .address(orderDTO.getAddress())
                .active(true)
                .user(user)
                .totalMoney(orderDTO.getTotalMoney())
                .phoneNumber(orderDTO.getPhoneNumber())
                .paymentMethod(orderDTO.getPaymentMethod())
                .fullName(orderDTO.getFullName())
                .note(orderDTO.getNote())
                .shippingAddress(orderDTO.getShippingAddress())
                .shippingMethod(orderDTO.getShippingMethod())
                .status(OrderStatus.PENDING)
                .build();
        return orderRepository.save(order);
    }

    @Override
    public Order findById(Long id) throws Exception {
        return orderRepository.findById(id).orElseThrow(() -> new DataNotFoundException("not found"));
    }

    @Override
    public Order updateOrder(Long id, OrderDTO orderDTO) throws Exception {
        Order order = findById(id);
        order.setEmail(orderDTO.getEmail());
        order.setAddress(orderDTO.getAddress());
        order.setNote(orderDTO.getNote());
        order.setFullName(orderDTO.getFullName());
        order.setPhoneNumber(orderDTO.getPhoneNumber());
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setShippingAddress(orderDTO.getShippingAddress());
        order.setTotalMoney(orderDTO.getTotalMoney());
        order.setShippingMethod(orderDTO.getShippingMethod());
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findAllByUserId(Long userId) throws Exception {
        return orderRepository.findByUserId(userId);
    }



    @Override
    public void deleteOrder(Long id) throws Exception {
        Order order = findById(id);
        order.setActive(false);
        orderRepository.save(order);
    }

    @Override
    public Page<Order> findAllOrders(PageRequest pageRequest) throws Exception {
        return orderRepository.findAll(pageRequest);
    }

    @Override
    public List<Order> findOrderByStatus(String status) throws Exception {
        return orderRepository.findByStatus(status);
    }
}
