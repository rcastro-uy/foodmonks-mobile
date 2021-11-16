import React, { createContext, useState } from 'react';
import { Producto } from '../interfaces/AppInterfaces';

//definir como luce, la informacion que tiene
export interface CarritoContext {
    producto : Producto
    cantidad : number
}

// lo usamos para indicar como luce a React y que expone el context
export interface CarritoContextProps {
    agregarProducto: (item:Producto, cantidad:number) => void;
    listarProductos: () => ({productos : CarritoContext[]});
    vaciarCarrito: () => void;
    quitarProducto: (postId: number) => void;
    modificarCantidad: (i: number, productoModificado: CarritoContext) => void;
    calcularTotal: () => ({total : number});
}

//crear contexto
export const CarritoContext = createContext({} as CarritoContextProps);

export  const CarritoProvider = ({children }: any) => {

    // para la funcion sumar totales
    let total = 0;

    const [productos, setProductos] = useState<CarritoContext[]>([]);

    const  agregarProducto = (item : Producto, cantidad:number) => {
        if (productos.length >0) {
            let i : number
            i = 0;
            while (i <productos.length){
              if (productos[i].producto.nombre != item.nombre){
                    if(i == productos.length-1 ){
                        const addCarrito : CarritoContext = {
                            producto : item,
                            cantidad : cantidad
                        } 
                        setProductos([...productos,addCarrito])
                    }
                i++
              }
              else {
                productos[i].cantidad= cantidad;
                i = productos.length;
              }
            }
        }else{
            const addCarrito : CarritoContext = {
                producto : item,
                cantidad : cantidad
            } 
            setProductos([...productos,addCarrito])
          }
    
    }
    const  vaciarCarrito = () => {
        setProductos([])
    
    }
    const  listarProductos = () => {
        if (productos.length > 0){
            return(
                {productos}
            )
        }else{
               console.log("no hay productos")
            }
            return(
                {productos}
            )
    }

    const  modificarCantidad = (i: number, productoModificado : CarritoContext) => {
      if (productoModificado.cantidad === 0){
        const productosUpdated = productos.filter(({cantidad} ) => cantidad !== 0);
        setProductos(productosUpdated)
      } else{
        const productosUpdated = productos.map((value, index,) => {
                 if (index === i) {
                   return productoModificado;
                 }
                 return value;
               });       
             setProductos(productosUpdated)
         }
    }

    const calcularTotal = () => {
        total= 0
        for (var i in productos){
            if (productos[i].producto.multiplicadorPromocion!=0)
                total = total + parseInt((((productos[i].producto.price*(100-productos[i].producto.multiplicadorPromocion))/100)* productos[i].cantidad).toFixed(0))
            else    
                total = total + (productos[i].cantidad * productos[i].producto.price)
        }
        return(
            {total}
        )
    }
    return (
        <CarritoContext.Provider value={{
            agregarProducto,
            listarProductos: () => ({productos}),
            vaciarCarrito,
            quitarProducto: (postId: number) => {},
            modificarCantidad,
            calcularTotal}}>
                {children}
        </CarritoContext.Provider>
    )
}
