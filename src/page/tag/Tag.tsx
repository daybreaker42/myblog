import PopularTagSection from "components/tag/PopularTagSection";
import CategoryLayout from "page/category/CategoryLayout";

export default function Tag() {
    return (
        <CategoryLayout title="Tag" popular={<PopularTagSection />} />
    );
}