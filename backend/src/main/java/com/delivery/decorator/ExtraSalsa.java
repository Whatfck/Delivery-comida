package com.delivery.decorator;

import com.delivery.model.Producto;

public class ExtraSalsa extends ProductoDecorator {
    public ExtraSalsa(Producto productoDecorado) {
        super(productoDecorado, "extra salsa", 1.00);
    }

    @Override
    public double getPrecio() {
        return productoDecorado.getPrecio() + 1.00;
    }

    @Override
    public String getDescripcion() {
        return productoDecorado.getDescripcion() + " + extra salsa";
    }
}