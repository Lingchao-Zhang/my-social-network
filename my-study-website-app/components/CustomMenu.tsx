import { CustomMenuType } from "@/types"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"
import { Fragment } from "react"

const CustomMenu = ({ title, state, filters, setState }: CustomMenuType) => {
    return(
        <div className="flexStart flex-col w-full gap-7 relative">
            <label htmlFor={title} className="w-full text-gray-100">
                {title}
            </label>
            <Menu as="div" className="self-start relative">
                <div>
                    <Menu.Button className="flexCenter custom_menu-btn">
                        {state || `Select a ${title}`}
                        <Image 
                          src="/arrow-down.svg"
                          width={10}
                          height={5}
                          alt="Arrow down"
                          />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="flexStart custom_menu-items">
                            {
                                filters.map((item) => (
                                    <Menu.Item key={item}>
                                        <button value={item} type="button" className="custom_menu-item" onClick={(event) => setState(event.currentTarget.value)}>
                                            {item}
                                        </button>
                                    </Menu.Item>
                                ))
                            }
                        </Menu.Items>
                    </Transition>
                </div>
            </Menu>
        </div>
    )
}

export default CustomMenu

