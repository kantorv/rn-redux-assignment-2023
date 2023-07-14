import { createMachine, assign, sendParent, sendTo, ActorRefFrom, spawn } from "xstate";
import { createActorContext } from '@xstate/react';
import { fetchProducts } from "./productsAPI";
import { filterItems } from './helpers'

//import { InterpreterFrom } from "xstate";



type MachineContext = {
    items: ProductItem[];
    filter: ProductsFilter;
    filteredItems: ProductItem[];
};


type MachineState =

    | { value: "preload"; context: MachineContext }
    | { value: "init"; context: MachineContext }


type MachineEvent =
    | { type: 'EVENTS.DATA.FILTER_BY_ATTRIBUTE', payload: FilterPayloadParams }







export const ProductsFilterMachine = createMachine<
    MachineContext,
    MachineEvent,
    MachineState
>({
    initial: "preload",
    id: "filtermachine",
    predictableActionArguments: true,
    context: {
        items: [],
        filteredItems: [],
        filter: {}
    },
    on: {



    },
    states: {
        preload: {
            entry: (_, e) => console.log("filtermachine.preload entry", e.type),
            exit: (_, e) => console.log("filtermachine.preload exit", e.type),
            invoke: {
                src: fetchProducts,
                onDone: {
                    actions: assign((_, e) => ({
                        items: e.data.data,
                        filteredItems: e.data.data
                    })),
                    target: "init"
                },
                onError: {
                    actions: [
                        (_, e) => console.log("fetchProducts.onError", e)
                    ]
                }
            }


        },



        init: {
            entry: (_, e) => console.log("filtermachine.init entry", e.type),
            exit: (_, e) => console.log("filtermachine.init exit", e.type),

            on: {
                "EVENTS.DATA.FILTER_BY_ATTRIBUTE": {
                    actions: [
                        assign((_, e) => _.filter[e.payload.name] !== undefined ? (

                                {
                                    filter: { ..._.filter, [e.payload.name]: undefined }
                                }

                            )
                            :
                            (
                                {
                                    filter: { ..._.filter, [e.payload.name]: e.payload.id }
                                }
                            )

                        ),

                        assign((_, e) => (

                                {
                                    filteredItems:filterItems(
                                        _.items,
                                        _.filter.brand,
                                        _.filter.quality,
                                        _.filter.size,
                                      )
                                }

                            )
                           

                        )
                    ]
                }
            }

        }

    }
});


export const selectFilter = (state: MachineState) => state.context.filter;
export const selectFilteredItems = (state: MachineState) => state.context.filteredItems;
export const selectItems = (state: MachineState) => state.context.items;


export const ProductsFilterMachineContext = createActorContext(ProductsFilterMachine, { devTools: true });
export type ProductsFilterMachineType = ActorRefFrom<typeof ProductsFilterMachine>