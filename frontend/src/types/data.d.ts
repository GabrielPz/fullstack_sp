export interface Data {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}
export interface CardsProps{
    data: Data[];
    searchTerm: string;
}
export interface HeaderProps {
    onOpenModal: () => void;
    setSearchTerm: ()=> void;
}

export interface UploadCSVProps {
    handleCloseModal: () => void;
    handleRefreshState: () => void;
}