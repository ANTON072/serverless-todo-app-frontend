export const Thumbnail = () => {
  return (
    <div>
      <div className="md:flex">
        <div>
          <div className="mt-4">
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover rounded-full bg-slate-300"
                  src="/img/default-user-icon.svg"
                  alt="現在のプロフィール写真"
                />
              </div>
              <label className="block">
                <span className="sr-only">新しいプロフィール写真を選択</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
