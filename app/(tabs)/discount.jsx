import {
    View,
    Text,
    RefreshControl,
    Image,
    Pressable,
    ActivityIndicator,
    ScrollView,
    ToastAndroid,
    FlatList,
    Animated,
    TouchableOpacity,
} from "react-native"
import DiscountList from "../components/DiscountList";
import Product_item from "../components/product_item/product_item";
import Recommen_List from "../components/Recommendation_Product";
import * as PromotionsServices from '../apiServices/promotionServices';
import * as PromotionsCartServices from '../apiServices/promotionCartServices';
import * as ProductServices from '../apiServices/productServices'
import * as asyncStorage from "../store/asyncStorage"
import * as UserServices from '../apiServices/userServices';
import { useState, useEffect } from "react";
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
function discount() {

    const [saleVoucher, setSale] = useState([])
    const [shipVoucher, setShip] = useState([])
    const [payVoucher, setPay] = useState([])

    const [listSale, setListSale] = useState([])

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
        const fetchApi = async () => {
            if (asyncStorage.getIsLogin() === 'false') {
                showToastWithGravity("Bạn chưa đăng nhập")
            }
            else {
                // setLoading(true)
                // setUser(JSON.parse(window.localStorage.getItem('user')))
                const id = await asyncStorage.getIdAsync()
                const userResult = await UserServices.getUser(id)


                const result = await PromotionsServices.getPromotionUser(userResult.data._id)
                    .catch((err) => {
                        console.log(err);
                        // setLoading(false)
                    });

                if (result) {
                    console.log(result);
                    setSale(result.sale)
                    setShip(result.ship)
                    setPay(result.pay)
                    // setLoading(false)
                }


                getList(
                    await createObjectQuery(
                        1,
                        9,
                        'discount',
                        'desc',

                    ), setListSale);
            }

        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const addPromotionCart = async (item) => {

        const id = await asyncStorage.getIdAsync()
        const userResult = await UserServices.getUser(id)
        const promotionCart = {
            user: userResult.data,
            discount: item
        }
        const fetchApi = async () => {
            const result = await PromotionsCartServices.CreatePromotionCart(promotionCart)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                console.log(result);
            }

        }

        fetchApi();

    }
    return (
        <View className='flex-1'>
            <ScrollView className='flex' showsVerticalScrollIndicator={false}>
                <DiscountList list={saleVoucher} title={'Giảm giá sản phẩm'} addToCart={addPromotionCart} />
                <DiscountList list={shipVoucher} title={'Ưu đãi vẫn chuyển'} addToCart={addPromotionCart} />
                <DiscountList list={payVoucher} title={'Giảm phí thanh toán'} addToCart={addPromotionCart} />
                <Recommen_List list={listSale} />
            </ScrollView>
        </View>
    );
}

export default discount;