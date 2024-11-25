import {
    View,
    FlatList,
    Text
} from "react-native";
import {
    Dialog,
} from '@rneui/themed';

const ModalLoading = ({ visible }) => {
    return (
        <View className=''>
            <Dialog isVisible={visible}>
                <Dialog.Loading />
            </Dialog>
        </View>

    );
}

export default ModalLoading