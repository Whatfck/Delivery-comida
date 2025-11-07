package com.delivery.decorator;

import com.delivery.model.Producto;

public abstract class ProductoDecorator extends Producto {
    protected Producto productoDecorado;

    public ProductoDecorator(Producto productoDecorado, String nombreExtra, double precioExtra) {
        super(productoDecorado.getNombre() + " con " + nombreExtra,
              productoDecorado.getPrecioBase() + precioExtra);
        this.productoDecorado = productoDecorado;
    }

    @Override
    public abstract double getPrecio();

    @Override
    public abstract String getDescripcion();
}