package com.delivery.decorator;

import com.delivery.model.Producto;

public class ExtraCarne extends ProductoDecorator {
    public ExtraCarne(Producto productoDecorado) {
        super(productoDecorado, "extra carne", 4.00);
    }

    @Override
    public double getPrecio() {
        return productoDecorado.getPrecio() + 4.00;
    }

    @Override
    public String getDescripcion() {
        return productoDecorado.getDescripcion() + " + extra carne";
    }
}