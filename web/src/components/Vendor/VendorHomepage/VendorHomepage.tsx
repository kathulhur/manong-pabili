import { useContext } from 'react'
import DashboardProductsCell from '../DashboardProductsCell'
import { Switch, Tab } from '@headlessui/react'
import Button from 'src/components/Button'
import clsx from 'clsx'
import {
    Bars2Icon,
    EyeSlashIcon,
    MapPinIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid'
import Marker from 'src/components/Marker/Marker'
import MarkerSelectModal from 'src/components/Modals/MarkerSelectModal'
import VendorProfileModal from 'src/components/Modals/VendorProfileModal'
import { VendorHomepageContext } from 'src/components/Vendor/VendorHomepageCell/Context'

const VendorHomepage = () => {
    const context = useContext(VendorHomepageContext)
    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="font-bold text-lg text-emerald-600">
                    Manong Pabili
                </h1>
                <Button
                    variant="subtle"
                    icon={<Bars2Icon className="w-7 h-7 text-gray-900" />}
                    onClick={() => context?.setIsVendorProfileModalOpen(true)}
                ></Button>
                <VendorProfileModal
                    isOpen={context?.isVendorProfileModalOpen}
                    onClose={() => context?.setIsVendorProfileModalOpen(false)}
                />
            </div>
            <div className="flex items-center justify-between mb-8">
                <p className="font-black text-xl text-slate-900">
                    Good day, {context?.vendor?.username}
                </p>
                <div
                    onClick={() => context?.setIsMarkerSelectModalOpen(true)}
                    className="relative flex items-center justify-center rounded-full p-3 w-12 h-12 bg-emerald-100 hover:bg-emerald-200"
                >
                    <PencilSquareIcon className="absolute -top-1 -right-1 w-6 h-6 p-1 rounded-full border-2 border-emerald-100 bg-white text-slate-700" />
                    <img src={context?.vendor?.markerUrl} alt="marker icon" />
                </div>
                <MarkerSelectModal
                    isOpen={context?.isMarkerSelectModalOpen}
                    onClose={() => context?.setIsMarkerSelectModalOpen(false)}
                    onSubmit={context?.updateVendorMarkerHandler}
                />
            </div>
            <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                    Show location
                </span>
                <Switch
                    checked={context?.isLocationShown}
                    onChange={
                        context?.isLocationShown
                            ? context?.hideLocationButtonHandler
                            : context?.showLocationButtonHandler
                    }
                    className={`${
                        context?.isLocationShown
                            ? 'bg-emerald-600'
                            : 'bg-gray-200'
                    }
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2`}
                >
                    <span className="sr-only">Show location</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            context?.isLocationShown
                                ? 'translate-x-5'
                                : 'translate-x-0'
                        }
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>

            <section className="relative rounded-md mb-4 h-48 bg-emerald-200/40 overflow-hidden lg:h-72">
                <div
                    id="map"
                    ref={context?.onRefSet}
                    hidden={!context?.isLocationShown}
                    className="h-full  max-w-full"
                ></div>
                {context?.isLocationShown &&
                    context?.vendor &&
                    context?.map && (
                        <Marker
                            vendor={context?.vendor}
                            map={context?.map}
                            draggable={
                                context?.locationBroadcastMode === 'MANUAL'
                            }
                            onDragEnd={context?.broadcastLocationHandler}
                            pulseColor="emerald"
                        />
                    )}
                {context?.isLocationShown && (
                    <button
                        className="absolute bottom-6 right-4 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow z-10"
                        onClick={context?.focusLocationButtonHandler}
                        aria-label="Focus on my location"
                    >
                        <MapPinIcon className="w-6 h-6 text-emerald-600"></MapPinIcon>
                    </button>
                )}

                {!context?.isLocationShown && (
                    <div className="grid place-items-center h-full">
                        <div className="flex flex-col items-center">
                            <EyeSlashIcon className="w-16 h-16 mb-1 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">
                                Your location is hidden
                            </span>
                        </div>
                    </div>
                )}
            </section>

            <Tab.Group
                as={'div'}
                selectedIndex={
                    context?.locationBroadcastMode === 'MANUAL'
                        ? 0
                        : context?.locationBroadcastMode === 'STATIC'
                        ? 1
                        : 2
                }
                onChange={(index) => {
                    switch (index) {
                        case 0:
                            return context?.manualModeButtonHandler()
                        case 1:
                            return context?.staticModeButtonHandler()
                        case 2:
                            return context?.realTimeModeButtonHandler()
                    }
                }}
            >
                <Tab.List className="flex space-x-1 rounded-md bg-emerald-200/40 p-1 mb-4">
                    {['Manual', 'Static', 'Realtime'].map((tab) => {
                        return (
                            <Tab
                                key={tab}
                                className={({ selected }) =>
                                    clsx(
                                        'w-full rounded-md px-3 py-2 text-sm font-semibold leading-5 text-emerald-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600',
                                        selected
                                            ? 'bg-white'
                                            : 'text-emerald-500 hover:bg-white/[0.12] hover:text-emerald-600'
                                    )
                                }
                            >
                                {tab}
                            </Tab>
                        )
                    })}
                </Tab.List>
                <Tab.Panels className="mb-12">
                    <Tab.Panel></Tab.Panel>
                    <Tab.Panel>
                        <Button
                            variant="secondary"
                            fullWidth
                            onClick={() =>
                                context?.updateLocationButtonHandler(
                                    context?.locationBroadcastMode
                                )
                            }
                            disabled={!context?.isLocationShown}
                        >
                            Update location
                        </Button>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <DashboardProductsCell userId={context?.vendor?.id} />
        </div>
    )
}

export default VendorHomepage
function getCoordinates():
    | { latitude: any; longitude: any; locationBroadcastMode: any }
    | PromiseLike<{
          latitude: any
          longitude: any
          locationBroadcastMode: any
      }> {
    throw new Error('Function not implemented.')
}
