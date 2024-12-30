import {
    View,
    ScrollView,
} from "react-native";
import Carousel from "../components/Carousel"
import Product_List from "../components/ProductList";
import Recommen_List from "../components/Recommendation_Product";
import * as ProductServices from '../apiServices/productServices'
import * as asyncStorage from "../store/asyncStorage"
import React, { useState, useCallback, useContext, useEffect } from 'react';
function home() {
    const slides = [
        'https://www.nj.com/resizer/v2/EMHUGWLALRFCDLKLEE2SMB3EYM.png?auth=8dadbf8bbda869f99d59fdb4f7eb7ea0807ed0707b91222a5b711569eb544bfa&width=500&quality=90',
        'https://images.summitmedia-digital.com/spotph/images/2023/03/03/80fa5741-ae16-4173-a039-2dbb6847a695-1677825077.jpeg',
        'https://hips.hearstapps.com/hmg-prod/images/nike-sale-2024-66030e2d96520.png?crop=0.500xw:1.00xh;0.251xw,0&resize=640:*'
    ]

    const [listSale, setListSale] = useState([])
    const [listNew, setListNew] = useState([])
    const [listJustForYou, setListJustForYou] = useState([])
    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        search,
        brand,
        category,
        classify,
        price
    ) => {
        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(search && { search }),
            ...(brand && { brand }),
            ...(category && { category }),
            ...(classify && { classify }),
            ...(price && { price }),
        };
    }

    const getList = async (obj, setList) => {
        const response = await ProductServices.getAllProducts(obj)
            .catch((error) => {
                // setPending(false);

                if (error?.response?.status === 404) {
                    setList([]);
                } else {
                    console.log(error);

                    // toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            // console.log(response);
            // setPending(false);
            setList(response.data);

        }
    }

    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    1,
                    9,
                    'discount',
                    'desc',

                ), setListSale);
            getList(
                await createObjectQuery(
                    1,
                    9,
                ), setListNew);

            const login = await asyncStorage.getIsLogin()
            if (login === 'true') {
                const id = await asyncStorage.getIdAsync()
                console.log("id", id);

                const result = await ProductServices.getRecommendProducts(id)
                if (result) {
                    setListJustForYou(result.data)
                }


            }
            else {
                getList(
                    await createObjectQuery(
                        1,
                        20,
                    ), setListJustForYou);
            }

            const now = new Date();
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <View className='relative flex h-full flex-1 flex-col'>
            <ScrollView className='flex' showsVerticalScrollIndicator={false}>
                <Carousel slides={slides} />
                <Product_List list={listNew} title={'Sản phẩm mới'} />
                <Product_List list={listSale} title={'Siêu khuyến mãi'} />
                <Recommen_List list={listJustForYou} />
            </ScrollView>

        </View>


    );
}

export default home;