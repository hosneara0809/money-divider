'use client';

import BackendMenu from "@/components/Layout/BackendMenu";



export default function LayoutAuth({children}) {
    return (
        <>
            <div className="flex justify-center gap-3">
                <div className="w-full md:w-3/12">
                    <div className="card shadow">
                        <div className="card-body">
                            <BackendMenu />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-9/12">
                    <div className="card shadow">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}