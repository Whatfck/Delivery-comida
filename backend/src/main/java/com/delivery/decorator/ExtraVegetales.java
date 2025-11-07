package com.delivery.decorator;

import com.delivery.model.Producto;

public class ExtraVegetales extends ProductoDecorator {
    public ExtraVegetales(Producto productoDecorado) {
        super(productoDecorado, "extra vegetales", 1.50);
    }

    @Override
    public double getPrecio() {
        return productoDecorado.getPrecio() + 1.50;
    }

    @Override
    public String getDescripcion() {
        return productoDecorado.getDescripcion() + " + extra vegetales";
    }
}