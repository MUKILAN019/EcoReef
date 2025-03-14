import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/card';
import { Search} from 'lucide-react';
import News from '../components/news';
import CoralReefMap from '../components/CoralReefMap';
import Percentage from '../components/percentage';
import Resources from '../components/resources';
import Postcards from '../components/postcards';
import { useState } from 'react';
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen w-full bg-[#1d232a]">
      <Header />
      
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        
        <div className="container mx-auto relative z-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-400">Explore the Underwater World</h1>
            <p className="text-gray-300 text-lg ">
              Discover coral ecosystems, track conservation efforts, and join a community of ocean enthusiasts
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
            <input
                type="text"
                placeholder="Search for coral species, locations or conservation projects..."
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-12 rounded-full border border-border bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ocean-400 shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content area - 2/3 width */}
            <div className="w-full lg:w-2/3">
             
              
             <Postcards searchQuery={searchQuery} />
              
              <News/>

            </div>
            
            {/* Sidebar - 1/3 width */}
            <div className="w-full lg:w-1/3 space-y-8">
                <CoralReefMap />
              
        
                <h3 className="text-xl font-bold mb-4 text-gray-200">Coral Reef's</h3>
                <div className="space-y-4">
                 <Percentage/>
                </div>
             
              
              <Resources/>
              
              <Card className="bg-gray-300 from-ocean-50 to-sunset-50 border-none p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  {/* Icon Container */}
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 flex items-center justify-center text-blue-950 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold">Create Your Reef Post</h3>
                    <p className="text-foreground/70 text-sm">
                      Explore the coral reef and share its condition with the community.  
                      Report if the reef is <span className="font-semibold text-green-700">Healthy</span>,  
                      <span className="text-yellow-500 font-semibold"> Partially Bleached</span>, or  
                      <span className="text-red-500 font-semibold"> Bleached</span>.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <a href="/create" className="btn btn-primary text-center w-full inline-block py-2 rounded-md font-medium">
                  Post Your Reef Report
                </a>
              </Card>

            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
