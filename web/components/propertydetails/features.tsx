import { Property } from "@/interfaces/property";
import formatText from "@/utils/format";
import { MapPin, PackagePlus, PencilRuler, Sofa, User2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Features({ property }: { property: Property }) {
  return (
    <>
      {/* Languages List */}
      {property.Host.languagesSpokenByHost && property.Host.languagesSpokenByHost.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User2 className="h-5 w-5 mr-2" />
                    Languages Spoken By Host
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.Host.languagesSpokenByHost.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">
                          {formatText(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Furniture List */}
            {property.furnitures && property.furnitures.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Sofa className="h-5 w-5 mr-2" />
                    Furniture & Amenities Included
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.furnitures.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">
                          {formatText(item.type)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nearby Facilities */}
            { property.nearbyFacilities && property.nearbyFacilities.length > 0 && (
              <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Nearby Facilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.nearbyFacilities.map((facility, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="h-5 w-5">{facility.icon}</span>
                        <div>
                          <p className="font-medium text-gray-800">
                            {facility.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {facility.distance} Km
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            )}

            {/* Amenities*/}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <PackagePlus className="h-5 w-5 mr-2" />
                    Additional Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">
                          {formatText(amenity.type)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* House Rules */}
            {property.pgRules && (
              <Card className="">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <PencilRuler className="h-5 w-5 mr-2" />
                    House Rules
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">{property.pgRules}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
        </>
    )
}