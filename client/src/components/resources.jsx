import Card from "./card";
import { Search, Map, Book, BarChart3, Info } from 'lucide-react';
export default function Resources() {
      return(
        <div className="bg-red-400">
             <Card>
                <h3 className="text-xl font-bold mb-4">Learning Resources</h3>
                <div className="space-y-4">
                  <a href="https://www.doc.govt.nz/documents/conservation/marine-and-coastal/fishing/coral-id-guide-updated.pdf" className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors">
                    <div className="bg-sunset-100 text-sunset-600 rounded-lg h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <Book size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Coral Identification Guide</h4>
                      <p className="text-xs text-foreground/60">Learn to identify 250+ species</p>
                    </div>
                  </a>
                  <a href="https://ceos.org/sdg/files/USO%20(2).pdf" className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors">
                    <div className="bg-ocean-100 text-ocean-600 rounded-lg h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Understanding Ocean Data</h4>
                      <p className="text-xs text-foreground/60">Make sense of marine research</p>
                    </div>
                  </a>
                  <a href="https://marinesanctuary.org/blog/coral-reefs-101/" className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors">
                    <div className="bg-sunset-100 text-sunset-600 rounded-lg h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <Map size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Reef Geography 101</h4>
                      <p className="text-xs text-foreground/60">Explore reef formations globally</p>
                    </div>
                  </a>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-ocean-900 hover:text-ocean-600 font-medium flex items-center justify-center text-sm">
                    Browse all resources
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Card>
        </div>
      )
} 