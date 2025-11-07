package com.delivery.decorator;

import com.delivery.model.Producto;

public class ProductoBase extends Producto {
    public ProductoBase(String nombre, double precioBase) {
        super(nombre, precioBase);
    }

    @Override
    public double getPrecio() {
        return precioBase;
    }

    @Override
    public String getDescripcion() {
        return nombre;
    }
}