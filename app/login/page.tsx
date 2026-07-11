// import {Button} from "@/components/ui/button"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import {Spinner} from "@/components/ui/spinner"

export default function login() {
    return (<section className={"mt-24 flex flex-col items-center justify-center mt-[30vh]"}>
        <Empty className="w-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner/>
                </EmptyMedia>
                <EmptyTitle>正在加载页面</EmptyTitle>
                <EmptyDescription>
                    请稍候，我们正在处理您的状态，不要刷新页面。
                </EmptyDescription>
            </EmptyHeader>
            {/*<EmptyContent>*/}
            {/*    <Button variant="outline" size="sm">*/}
            {/*        Cancel*/}
            {/*    </Button>*/}
            {/*</EmptyContent>*/}
        </Empty>
    </section>)
}