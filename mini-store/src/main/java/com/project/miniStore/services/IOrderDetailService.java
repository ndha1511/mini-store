package com.project.miniStore.services;

import com.project.miniStore.dtos.OrderDetailDTO;
import com.project.miniStore.models.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) throws Exception;
    List<OrderDetail> findAllByOrderId(Long orderId) throws Exception;
    void deleteOrderDetail(Long id) throws Exception;
    OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws Exception;
    OrderDetail findById(Long id) throws Exception;

}
