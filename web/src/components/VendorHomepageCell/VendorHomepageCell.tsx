import type {
  FindVendorHomepageQuery,
  FindVendorHomepageQueryVariables,
  HideVendorLocationMutation,
  HideVendorLocationMutationVariables,
  BroadcastLocationMutation,
  BroadcastLocationMutationVariables,
  UpdateVendorMarkerMutation,
  UpdateVendorMarkerMutationVariables
} from "types/graphql";

import { type CellSuccessProps, type CellFailureProps, MetaTags, useMutation } from "@redwoodjs/web";
import Button from "../Button/Button";
import { Bars2Icon, EyeSlashIcon, MapPinIcon } from "@heroicons/react/20/solid";
import VendorProfileModal from "../Modals/VendorProfileModal";
import MarkerSelectModal from "../Modals/MarkerSelectModal";
import { Switch, Tab } from "@headlessui/react";
import clsx from "clsx";
import DashboardProductsCell from "../DashboardProductsCell";
import { useCallback, useEffect, useState } from "react";
import { getCurrentPositionAsync } from "src/hooks/useCoordinates";
import usePusher from "src/hooks/usePusher";
import { createMarker } from "src/pages/MapPage/MapPage";
import { useAuth } from "src/auth";
import tt from "@tomtom-international/web-sdk-maps";

export const beforeQuery = ({ userId }) => {
  return {
    variables: { id: userId }
  }
}
export const QUERY = gql`
  query FindVendorHomepageQuery($id: Int!) {
    vendor: user(id: $id) {
      id
      name
      username
      mobileNumber
      markerUrl

    }
  }
`;


const HIDE_VENDOR_LOCATION_MUTATION = gql`
    mutation HideVendorLocationMutation($id: Int!, $input: HideVendorLocationInput!) {
        hideVendorLocation(id: $id, input: $input) {
            id
            name
            username
            latitude
            longitude
            products {
                id
                name
            }
            roles
        }
    }
`

const BROADCAST_LOCATION_MUTATION = gql`
    mutation BroadcastLocationMutation($id: Int!, $input: BroadcastLocationInput!) {
        broadcastLocation(id: $id, input: $input) {
            id
            name
            username
            latitude
            longitude
            products {
                id
                name
            }
            roles
            markerUrl
        }
    }
`

const UPDATE_VENDOR_MARKER = gql`
    mutation UpdateVendorMarkerMutation($id: Int!, $input: UpdateUserInput!) {
        updateVendorMarker: updateUser(id: $id, input: $input) {
            id
        }
    }
`

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindVendorHomepageQueryVariables>) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  vendor,
}: CellSuccessProps<
  FindVendorHomepageQuery,
  FindVendorHomepageQueryVariables
>) => {

  const [hideVendorLocation] = useMutation<HideVendorLocationMutation, HideVendorLocationMutationVariables>(HIDE_VENDOR_LOCATION_MUTATION);
  const [broadcastLocation] = useMutation<BroadcastLocationMutation, BroadcastLocationMutationVariables>(BROADCAST_LOCATION_MUTATION);
  const [updateVendorMarker] = useMutation<UpdateVendorMarkerMutation, UpdateVendorMarkerMutationVariables>(UPDATE_VENDOR_MARKER)


  const [isLocationShown, setIsLocationShown] = useState(false)
  const [isRealTime, setIsRealTime] = useState(false)
  const [markers, setMarkers] = useState<tt.Marker[]>([])
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>(null)
  const [map, setMap] = useState<tt.Map>(null)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [isVendorProfileModalOpen, setIsVendorProfileModalOpen] = useState(
      false
      )
  const [isMarkerSelectModalOpen, setIsMarkerSelectModalOpen] = useState(false)
  const [pusher, channel] = usePusher()


  const locationBroadcastEventHandler = useCallback(({vendor}) => {
      const marker = createMarker(vendor)
      // check if marker already exists, if it does, remove it, then add the new one
      console.log('hey')
      setMarkers([
          ...markers.filter(
              (m) => m.getElement().id !== marker.getElement().id
          ),
          marker,
      ])
  }, [markers])


  useEffect(() => {
      if (pusher && channel) {
          channel.bind('location-broadcast', locationBroadcastEventHandler)
      }

      return () => {
          if (channel) {
              channel.unbind('location-broadcast')
          }
      }
  }, [pusher, locationBroadcastEventHandler])


  useEffect(() => {
      const handleVisibilityChange = () => {
          setIsPageVisible(!document.hidden)
          console.log('visibility changed to ' + !document.hidden)
      }

      // Add visibilitychange event listener when component mounts
      document.addEventListener('visibilitychange', handleVisibilityChange)

      // Remove visibilitychange event listener when component unmounts
      return () => {
          document.removeEventListener(
              'visibilitychange',
              handleVisibilityChange
          )
      }
  }, [])

  const mapRef = useCallback((node) => {
      if (node !== null) {
          const map = tt.map({
              key: process.env.TOMTOM_API_KEY,
              container: node,
              center: [121.004995, 14.610395],
              zoom: 15,
          })
          setMap(map)
      }
  }, [])


  const broadcastLocationHandler = useCallback(async () => {
      if (!vendor || !map ) return
      if (!process.env.PUSHER_CHANNEL) throw new Error("PUSHER_CHANNEL ENV is undefined")


      try {
          const position = await getCurrentPositionAsync({
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
          })
          map.setCenter([position.coords.longitude, position.coords.latitude])
          map.zoomTo(15)

          await broadcastLocation({
              variables: {
                  id: vendor.id,
                  input: {
                      channel: process.env.PUSHER_CHANNEL,
                      event: "location-broadcast",
                      longitude: position.coords.longitude,
                      latitude: position.coords.latitude,
                  }
              },
              onError: (err) => {
                  console.log(err)
                  alert('failed broadcasting location')
              },
              onCompleted: () => {
                  console.log('broadcasting location success')
              }
          })

          setCoordinates(position.coords)
      } catch (err) {
          console.log(err)
          if (err.code === 1) {
              alert(
                  'You have denied access to your location. Please enable your browser location settings.'
              )
          }

          if (err.code === 2) {
              alert(
                  'Please turn on your device location settings and try again. '
              )
          }

          if (err.code === 3) {
              alert(
                  'Location request timed out. Please try again or try moving to a location with better signal.'
              )
          }
      }
  }, [vendor, map, broadcastLocation])

  useEffect(() => {
      if (!isPageVisible || !isLocationShown || !isRealTime) return
      const intervalId = setInterval(() => {
          broadcastLocationHandler()
          console.log('realtime broadcast')
      }, 5000)

      return () => {
          clearInterval(intervalId)
      }
  }, [isPageVisible, isRealTime, broadcastLocationHandler, isLocationShown])



  useEffect(() => {
      if (!map) return
      markers.forEach((marker) => {
          marker.addTo(map)
      })

      return () => {
          markers.forEach((marker) => {
              marker.remove()
          })
      }
  }, [map, markers])

  const showLocationButtonHandler = () => {
      setIsLocationShown(true)
      if (!isRealTime) {
          updateLocationButtonHandler()
      }
  }

  const hideLocationButtonHandler = useCallback(async () => {
      if (!vendor) return
      if (!process.env.PUSHER_CHANNEL) throw new Error("PUSHER_CHANNEL ENV is undefined")

      try {
          await hideVendorLocation({
              variables: {
                  id: vendor.id,
                  input: {
                      channel: process.env.PUSHER_CHANNEL,
                      event: "hide-location"
                  }
              },
              onError: (err) => {
                  console.log(err)
                  alert('failed hiding vendor location')
              },
              onCompleted: () => {
                  console.log('hiding location success')
              }
          })
          setIsLocationShown(false)
      } catch (err) {
          console.log(err)
      }
  }, [vendor])

  const realTimeModeButtonHandler = () => {
      setIsRealTime(true)
      console.log('mode changed to real time')
  }

  const manualModeButtonHandler = () => {
      setIsRealTime(false)
      console.log('mode changed to manual')
  }

  const updateLocationButtonHandler = () => {
      console.log('Update location')
      broadcastLocationHandler()
  }

  const updateVendorMarkerHandler = async (url: string) => {
      console.log('update marker')
      try {
          await updateVendorMarker({
              variables: {
                  id: vendor?.id,
                  input: {
                      markerUrl: url
                  }

              },
              refetchQueries: [QUERY],
              onError: (err) => {
                  console.log(err)
                  setIsMarkerSelectModalOpen(false)
              },
              onCompleted: () => {
                  console.log('success')
                  setIsMarkerSelectModalOpen(false)
              }
          })
      } catch (err) {

      }
  }


  const focusLocationButtonHandler = useCallback(() => {
      if (!map || !coordinates) return
      map.setCenter([coordinates.longitude, coordinates.latitude])
      map.zoomTo(15)
  }, [map, coordinates])

  return (
    <div className='max-w-7xl mx-auto p-8'>
      <MetaTags title="Home" description="Home page" />
      <div className='flex justify-between items-center mb-10'>
          <h1 className='font-extrabold text-xl text-green-700'>Manong Pabili</h1>
          <Button
              className='bg-slate-100'
              onClick={() => setIsVendorProfileModalOpen(true)}
          >
              <Bars2Icon
                  className="h-7 w-7 text-slate-800"
              />
          </Button>
          <VendorProfileModal
              isOpen={isVendorProfileModalOpen}
              onClose={() => setIsVendorProfileModalOpen(false)}
          />
      </div>
      <div className='flex justify-between mb-8'>
          <p className='mb-4 font-black text-2xl'>Good day, {vendor?.username}</p>
          <div className='flex flex-col items-center space-y-4'>
              <div className='rounded-full border-2 border-black p-4 w-20 h-20 flex items-center justify-center'>
                  <img src={vendor?.markerUrl} alt="marker icon"/>
              </div>
              <button
                  onClick={() => setIsMarkerSelectModalOpen(true)}
                  className='px-4 py-2 bg-green-400 rounded-full text-white font-semibold'>Change marker</button>
              <MarkerSelectModal
                  isOpen={isMarkerSelectModalOpen}
                  onClose={() => setIsMarkerSelectModalOpen(false)}
                  onSubmit={updateVendorMarkerHandler}
              />
          </div>
      </div>
      <div className='mb-4 flex items-center justify-between'>
          <span className='text-lg font-semibold'>Show location</span>
          <Switch
              checked={isLocationShown}
              onChange={isLocationShown ? hideLocationButtonHandler : showLocationButtonHandler}
              className={`${isLocationShown ? 'bg-green-600' : 'bg-green-400'}
              relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
              <span className="sr-only">Show location</span>
              <span
                  aria-hidden="true"
                  className={`${isLocationShown ? 'translate-x-7' : 'translate-x-0'}
                  pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
          </Switch>
      </div>

      <section className='relative rounded-lg mb-4 h-64 bg-green-100/80 overflow-hidden'>

          <div
              id="map"
              ref={mapRef}
              hidden={!isLocationShown}
              className='h-full w-full'
          ></div>
          {isLocationShown &&
              <button
                  className='absolute bottom-6 right-4 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow z-10'
                  onClick={focusLocationButtonHandler}
                  aria-label='Focus on my location'
              >
                  <MapPinIcon className='w-6 h-6 text-green-600'></MapPinIcon>
              </button>
          }

          { !isLocationShown && <div
                  className='grid place-items-center h-full'
              >
                  <div className='flex flex-col items-center'>
                      <EyeSlashIcon className='w-16 h-16 mb-1 text-green-900' />
                      <span className='text-green-900 text-lg font-bold'>Your location is hidden</span>
                  </div>
              </div>
          }

      </section>

      <Tab.Group
          onChange={(index) => {
              switch(index) {
                  case 0: return manualModeButtonHandler()
                  case 1: return realTimeModeButtonHandler()
              }
          }
      }>
          <Tab.List className="flex space-x-1 rounded-lg bg-green-300/20 p-1 mb-4">
              <Tab
                  className={({ selected }) =>
                      clsx(
                      'w-full rounded-lg py-2.5 text-base font-semibold leading-5 text-green-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                      selected
                          ? 'bg-white'
                          : 'text-green-500 hover:bg-white/[0.12] hover:text-green-600'
                      )
                  }
              >Manual</Tab>
              <Tab
                  className={({ selected }) =>
                      clsx(
                      'w-full rounded-lg py-2.5 text-base font-semibold leading-5 text-green-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                      selected
                          ? 'bg-white'
                          : 'text-green-500 hover:bg-white/[0.12] hover:text-green-600'
                      )
                  }
              >Realtime</Tab>
          </Tab.List>
          <Tab.Panels className='mb-12'>
              <Tab.Panel>
                  <Button
                      fullWidth
                      onClick={updateLocationButtonHandler}
                      disabled={!isLocationShown}
                  >Update location</Button>
              </Tab.Panel>
          </Tab.Panels>
      </Tab.Group>

      <DashboardProductsCell userId={vendor?.id} />
  </div>
)
};
