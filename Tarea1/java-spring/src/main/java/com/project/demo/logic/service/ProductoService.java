package com.project.demo.logic.service;

import com.project.demo.logic.entity.producto.Producto;
import com.project.demo.logic.entity.producto.ProductoRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Transactional
    public Producto findById(Long id) {
        Producto producto = productoRepository.findById(id).orElse(null);
        if (producto != null) {
            // Initialize lazy-loaded properties
            Hibernate.initialize(producto.getCategoria());
            // Inicializa otras propiedades perezosas si las hay
        }
        return producto;
    }

    public void deleteById(Long id) {
        productoRepository.deleteById(id);
    }
}