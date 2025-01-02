import { useState, useCallback, useEffect } from 'react'

export function useSearchForASong(allTracks, isSideMenuOpen) {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredTracks, setFilteredTracks] = useState(allTracks)

    const searchForASong = useCallback((query) => {
        const search = query.toLowerCase()
        setSearchQuery(search)

        if (search) {
            const results = allTracks.filter(track =>
                track.title.toLowerCase().includes(search) ||
                track.artist.toLowerCase().includes(search)
            )
            setFilteredTracks(results)
        } else {
            setFilteredTracks(allTracks)
        }
    }, [allTracks])

    useEffect(() => {
        if (!isSideMenuOpen) {
            setSearchQuery("")
            setFilteredTracks(allTracks)
        }
    }, [isSideMenuOpen, allTracks])

    return {
        searchQuery,
        filteredTracks,
        searchForASong
    }
}
