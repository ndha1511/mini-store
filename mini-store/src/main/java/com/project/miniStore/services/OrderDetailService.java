package com.project.miniStore.services;

import com.project.miniStore.dtos.OrderDetailDTO;
import com.project.miniStore.exceptions.DataNotFoundException;
import com.project.miniStore.models.Order;
import com.project.miniStore.models.OrderDetail;
import com.project.miniStore.models.Product;
import com.project.miniStore.repositories.OrderDetailRepository;
import com.project.miniStore.repositories.OrderRepository;
import com.project.miniStore.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService implements IOrderDetailService{
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    @Override
    public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) throws Exception {
        Product product = productRepository.findById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("not found product"));
        Order order = orderRepository.findById(orderDetailDTO.getOrderId())
                .orElseThrow(() -> new DataNotFoundException("not found order"));
        OrderDetail orderDetail = OrderDetail.builder()
                .product(product)
                .order(order)
                .price(orderDetailDTO.getPrice())
                .color(orderDetailDTO.getColor())
                .numberOfProducts(orderDetailDTO.getNumberOfProducts())
                .totalMoney(orderDetailDTO.getTotalMoney())
                .build();
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public List<OrderDetail> findAllByOrderId(Long orderId) throws Exception {
        return orderDetailRepository.findOrderDetailsByOrderId(orderId);
    }

    @Override
    public void deleteOrderDetail(Long id) throws Exception {
        orderDetailRepository.deleteById(id);
    }

    @Override
    public OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws Exception {
        return null;
    }

    @Override
    public OrderDetail findById(Long id) throws Exception{
        return orderDetailRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("not found"));
    }
}
