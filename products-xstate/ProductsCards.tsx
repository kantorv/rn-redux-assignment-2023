import React, {useEffect, useState} from 'react';
import { useSelector } from '@xstate/react';


import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
//import React from 'react';
import { ProductsFilterMachineContext, selectFilter,selectFilteredItems,selectItems } from './mainmachine';
import { getUniqueAttributesList } from './helpers'
const ProductsCards = () => {


    const svc = ProductsFilterMachineContext.useActorRef()

    const items = useSelector(svc, selectItems);
    const filter = useSelector(svc, selectFilter);
    const filteredItems = useSelector(svc, selectFilteredItems);


    // const {
    //   items,
    //   filter,
    //   filteredItems,

    // } = useSelector(svc, (state)=>{

    //   return {
    //     items:  state.context.items,
    //     filter:  state.context.filter,
    //     filteredItems: state.context.filteredItems,
    //   }
    // })


 // const items: ProductItem[] = useAppSelector(selectItems);
  const {brands, qualities, sizes} = getUniqueAttributesList(items); // as {brands:ProductBrand[],qualities:ProductQuality[],sizes:ProductSize[]}

  // const filter = useAppSelector(selectFilter);
  // const filteredItems = useAppSelector(selectFilteredItems);
  //const dispatch = useAppDispatch();

  const [enabledBrands, setEnabledBrands] = useState<Array<number>>([]);
  const [enabledQualities, setEnabledQualities] = useState<Array<number>>([]);
  const [enabledSizes, setEnabledSizes] = useState<Array<number>>([]);



  const filterBy = (obj:FilterPayloadParams)=>{
    console.log("filterBy called", obj)

    svc.send({
      type: "EVENTS.DATA.FILTER_BY_ATTRIBUTE",
      payload:obj
    })
  }

  useEffect(() => {
    //load products on startup
    if(undefined === items) return
    console.log('[ProductsCards.tsx] items updated', items.length);
    //dispatch(loadProductsAsync());
  }, [items]);

  useEffect(() => {
    //load products on startup
    console.log('[ProductsCards.tsx] useEffect called');
    //dispatch(loadProductsAsync());
  }, []);

  useEffect(() => {
    const {
      brands: _brands,
      qualities: _qualities,
      sizes: _sizes,
    } = getUniqueAttributesList(filteredItems);

    const _enabledBrands = _brands.map(x => x.id);
    const _enabledQualities = _qualities.map(x => x.id);
    const _enabledSizes = _sizes.map(x => x.id);
    //console.log('[ProductsCards.tsx] filteredItems updated', items.length, { _enabledBrands, _enabledQualities, _enabledSizes });

    setEnabledBrands(_enabledBrands);
    setEnabledQualities(_enabledQualities);
    setEnabledSizes(_enabledSizes);
  }, [filteredItems]);

  // useEffect(()=>{
  //   console.log("[ProductsCards.tsx] attributes updated", {brands, qualities, sizes})
  // },[brands, qualities, sizes])

  return (
    <View>
      <Text style={styles.headingText}>Brands</Text>
      <ScrollView horizontal={true} style={styles.container}>
        {brands.map(
          item => (
          <View
            key={item.id}
            style={[styles.card, styles.cardElevated]}
          >
            <Pressable
              disabled={!enabledBrands.includes(item.id)}
              style={[styles.button,
                item.id === filter.brand ? styles.pressableSelected :
                !enabledBrands.includes(item.id) ? styles.pressableDisabled : styles.pressableEnabled]}
              onPress={() =>filterBy({name:'brand',id: item.id})}
            >
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </Pressable>
          </View>
        ))}

      </ScrollView>

      <Text style={styles.headingText}>Qualities</Text>
      <ScrollView horizontal={true} style={styles.container}>

        {
          qualities.map(item => (
            <View
              key={item.id}
              style={[styles.card, styles.cardElevated]}>
              <Pressable
                disabled={!enabledQualities.includes(item.id)}
                style={[styles.button,
                item.id === filter.quality ? styles.pressableSelected :
                  enabledQualities.includes(item.id) ? styles.pressableEnabled : styles.pressableDisabled]}
                onPress={() => filterBy({name:'quality',id: item.id})}
              >
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
              </Pressable>
            </View>))
        }

      </ScrollView>


      <Text style={styles.headingText}>Sizes</Text>
      <ScrollView horizontal={true} style={styles.container}>
        {sizes.map(item => (
          <View key={item.id} style={[styles.card, styles.cardElevated]}>
            <Pressable
              disabled={!enabledSizes.includes(item.id)}
              style={[styles.button,
                item.id === filter.size ? styles.pressableSelected :
                enabledSizes.includes(item.id) ? styles.pressableEnabled : styles.pressableDisabled]}
            //  onPress={() => dispatch(filterBySize(item.id))}
              onPress={() => filterBy({name:'size',id: item.id})}
            >
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export {ProductsCards};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    padding: 8,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 4,
    margin: 8,
  },
  cardElevated: {
    backgroundColor: '#CAD5E2',
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  button: {
    // backgroundColor: 'red',
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableDisabled: {
    backgroundColor: 'gray',
  },
  pressableEnabled: {
    backgroundColor: 'blue',
  },
  pressableSelected: {
    backgroundColor: 'green',
  },
});
