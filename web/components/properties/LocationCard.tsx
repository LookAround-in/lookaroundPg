import { MapPin, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface LocationCardProps {
    imageUrl?: string;
    available?: boolean;
    locationName?: string;
    locationTagline?: string;
    propertyCount?: number;
    popularAreas?: string[];
}

const LocationCard = ({ imageUrl, popularAreas, locationName, locationTagline, propertyCount, available }: LocationCardProps) => {
    const router = useRouter();
    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Image with Overlay */}
            <div className="relative h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
                {/* Background image - you can replace this with actual image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${imageUrl}')`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/50" />

                {/* Top Navigation */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <Bell className="h-5 w-5 text-white" />
                    </button>
                    {available ? (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full">
                            Available
                        </Badge>
                    ) : (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full">
                            Coming Soon
                        </Badge>
                    )}
                </div>

                {/* Location Info */}
                <div className="absolute bottom-4 left-4">
                    <div className="flex items-center text-white/90 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{locationTagline}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{locationName}</h2>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{propertyCount}+ Properties</h3>

                <div className="mb-6">
                    <h4 className="text-gray-600 font-medium mb-3">Popular Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                        {popularAreas?.map((area, index) => (
                            <Badge key={index} variant="outline" className="px-3 py-1 text-gray-700 border-gray-300">
                                {area}
                            </Badge>
                        ))}
                        <Badge variant="outline" className="px-3 py-1 text-gray-700 border-gray-300">
                            +1
                        </Badge>
                    </div>
                </div>

                {/* CTA Button */}
                {available ? (
                    <Button onClick={() => router.push("/explore")} className="w-full text-white py-3 rounded-xl flex items-center justify-center gap-2">
                        View Properties
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                ) : (
                    <Button onClick={() => router.push("/explore")} variant="secondary" className="w-full text-gray-900 py-3 rounded-xl flex items-center justify-center gap-2">
                        Notify Me
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LocationCard;